export class qna {
    id: number;
    title: string;
    answer: string;
    linkAnswer: string;
    attachemnts: string;

    constructor(id: number,
        title: string,
        answer: string,
        linkAnswer: string,
        attachemnts: string) {

        this.id = id;
        this.title = title;
        this.answer = answer;
        this.linkAnswer = linkAnswer;
        this.attachemnts = attachemnts;

    }
}