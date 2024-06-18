/**
 *  Metadata for RDB entity: the content items registry.
 *  @namespace Gb_Back_Store_RDb_Schema_Content
 */
// MODULE'S VARS
const NS = 'Gb_Back_Store_RDb_Schema_Content';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/content';

/**
 * @memberOf Gb_Back_Store_RDb_Schema_Content
 * @type {Object}
 */
const ATTR = {
    CONTENT: 'content',
    DATE_CREATED: 'date_created',
    ID: 'id',
    POST_TYPE: 'post_type',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Gb_Back_Store_RDb_Schema_Content
 */
class Dto {
    static namespace = NS;
    /**
     * The content of the imported data.
     * @type {string}
     */
    content;
    /**
     * Date-time when record was created.
     * @type {Date}
     */
    date_created;
    /**
     * The post_id tag from the imported data.
     * @type {number}
     */
    id;
    /**
     * The WordPress post type.
     * @type {string}
     */
    post_type;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Gb_Back_Store_RDb_Schema_Content {
    /**
     * @param {Gb_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Gb_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Gb_Back_Store_RDb_Schema_Content.Dto} [data]
         * @return {Gb_Back_Store_RDb_Schema_Content.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.content = cast.string(data?.content);
            res.date_created = cast.date(data?.date_created);
            res.id = cast.int(data?.id);
            res.post_type = cast.string(data?.post_type);
            return res;
        };

        /**
         * Set JSDoc return type, real code is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Gb_Back_Store_RDb_Schema_Content.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}

