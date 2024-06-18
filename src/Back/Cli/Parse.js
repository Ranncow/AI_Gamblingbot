/**
 * Parse the XML file with content data and save it into the RDB.
 *
 * @namespace Gb_Back_Cli_Parse
 */
// MODULE'S IMPORTS
import fs from 'fs';
import readline from 'readline';

// MODULE'S VARS
const NS = 'Gb_Back_Cli_Parse';
const OPT_FILE = 'file';

// MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {Gb_Back_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @param {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} fOpt
 * @param {TeqFw_Core_Back_App} app
 * @param {Gb_Back_RDb_IConnect} conn
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 * @param {Gb_Back_Store_RDb_Schema_Content} rdbContent
 *
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Gb_Back_Cli_Parse
 */
export default function Factory(
    {
        Gb_Back_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
        'TeqFw_Core_Back_Api_Dto_Command_Option#Factory$': fOpt,
        TeqFw_Core_Back_App$: app,
        TeqFw_Db_Back_RDb_IConnect$: conn,
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
        Gb_Back_Store_RDb_Schema_Content$: rdbContent,
    }
) {

    // FUNCS
    /**
     * Command action.
     * @param opts
     * @returns {Promise<void>}
     * @memberOf Gb_Back_Cli_Parse
     */
    async function action(opts) {
        // FUNCS

        /**
         * Save one item into the RDB.
         * @param {TeqFw_Db_Back_RDb_ITrans} trx DB transaction for data processing
         * @param {number} id
         * @param {string} type
         * @param {string} content
         * @return {Promise<void>}
         */
        async function processContent(trx, id, type, content) {
            const dto = rdbContent.createDto();
            dto.content = content;
            dto.id = id;
            dto.post_type = type;
            await crud.create(trx, rdbContent, dto);
        }

        // MAIN
        let starts = 0; // to control the start tags count
        let ends = 0; // to control the end tags count
        let totalProcessed = 0; // to control the total of processed items
        let totalIds = 0;
        let totalTypes = 0;

        const tagContentStart = '<content:encoded><![CDATA['; // the start key string
        const tagContentEnd = ']]></content:encoded'; // the end key string
        const tagIdStart = '<wp:post_id>';
        const tagIdEnd = '</wp:post_id>';
        const tagTypeStart = '<wp:post_type><![CDATA[';
        const tagTypeEnd = ']]></wp:post_type>';

        // buffers to collect the collected data
        let content = null;
        let id = null;
        let type = null;

        const filename = opts[OPT_FILE];
        if (filename) {
            const inputStream = fs.createReadStream(filename);
            const rl = readline.createInterface({
                input: inputStream,
                crlfDelay: Infinity
            });
            const trx = await conn.startTransaction();
            try {
                let isInContent = false;
                for await (const line of rl) {
                    if (line.includes(tagContentStart)) {
                        isInContent = true;
                        starts++;
                        content = line.split(tagContentStart)[1] || '';
                        // the end of one-line content
                        if (line.includes(tagContentEnd)) {
                            ends++;
                            isInContent = false;
                            content = content.split(tagContentEnd)[0];
                        }
                    } else {
                        if (isInContent) {
                            if (line.includes(tagContentEnd)) {
                                // the end of multi-line content
                                ends++;
                                isInContent = false;
                                content += line.split(tagContentEnd)[0];
                            } else {
                                content += line;
                            }
                        } else {
                            // the `post_id` tag follows the `content` tag
                            if (line.includes(tagIdStart) && line.includes(tagIdEnd)) {
                                totalIds++;
                                const norm = line.trim().replace(tagIdStart, '').replace(tagIdEnd, '');
                                id = Number.parseInt(norm);
                            }
                            // the `post_type` tag follows the `post_id` tag
                            if (content && id && line.includes(tagTypeStart) && line.includes(tagTypeEnd)) {
                                totalTypes++;
                                type = line.trim().replace(tagTypeStart, '').replace(tagTypeEnd, '');
                                await processContent(trx, id, type, content);
                                // clean the buffers for content after processing
                                content = null;
                                id = null;
                                totalProcessed++;
                            }
                        }
                    }
                }
                // commit the DB changes
                await trx.commit();
            } catch (e) {
                logger.exception(e);
                await trx.rollback();
            }

        } else {
            logger.error(`You need to provide a file name with the XML to be imported into RDB.`);
        }
        logger.info(`The job is done. Content (starts/ends): ${starts}/${ends}. Processed: ${totalProcessed}. IDs/Types: ${totalIds}/${totalTypes}.`);
        await app.stop();
    }

    Object.defineProperty(action, 'namespace', {value: NS});

    // MAIN
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'parse';
    res.desc = 'parse and save the XML file with content data';
    res.action = action;
    // add option --file
    const optFile = fOpt.create();
    optFile.flags = `-f, --${OPT_FILE} <path>`;
    optFile.description = `the path to the location where the imported XML data is stored`;
    res.opts.push(optFile);
    return res;
}
