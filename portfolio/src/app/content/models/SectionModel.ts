import { CardModel, ParagraphCardModel } from './CardModel';

export class SectionModel {
    title: string;
    description: string;
    object3DPath: string | undefined;
    subsections: Array<SubsectionModel>;
}

export class SubsectionModel {
    title: string;
    content: Array<CardModel | ParagraphCardModel>
}
