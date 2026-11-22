export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly createAr?: string
    ) { };


    get values() {

        const returnObject: { [key: string]: any} = {};
        if (this.text) returnObject.text = this.text;
        if (this.createAr) returnObject.createAr = this.createAr;

        return returnObject;

    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateTodoDto?] {


        const {id, text, createAr } = props;
        let newCreateAr = createAr;

        if(!id || isNaN(Number(id))) {
            return ['id must be a valid number']
        };

        if (createAr) {
            newCreateAr = new Date(createAr);
            if (newCreateAr.toString() === 'Invalid Date') {
                return ['createAr must be a valid date']
            }
        };

        return [undefined, new UpdateTodoDto(id, text, newCreateAr)]
    };


}