export class CardModel {
    title: string;
    description: string;
    content: string;
    imgSrc: string;
    gitButtonLink: string;
    demoButtonLink: string;
    customButtonLink: string;
    customButtonText: string;
    tags: Array<string>;
    disabled: boolean;
}

export class ParagraphCardModel {
    title: string;
    description: string;
    paragraphList: Array<Paragraph>;
    isParagraph: boolean = true;
}

class Paragraph {
    content: string;
    link: string;
    icon: string;
}
  