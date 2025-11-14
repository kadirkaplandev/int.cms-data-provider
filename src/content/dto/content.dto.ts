export class ContentDto {
    type: string;
    title: string;
    fields: any;
    constructor(doc: any) {

        this.type = doc.type;
        this.title = doc.title;
        this.fields = doc.fields;
    }
}