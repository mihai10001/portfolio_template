import { CardModel } from './CardModel';

export class SectionModel {
    title: string;
    description: string;
    subsections: Array<SubsectionModel>;
}

export class SubsectionModel {
    title: string;
    content: Array<CardModel>
}
