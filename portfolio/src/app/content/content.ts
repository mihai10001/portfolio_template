import { ContentModel } from './models/ContentModel';
import { SectionModel, SubsectionModel } from "./models/SectionModel";
import { CardModel  } from './models/CardModel';

export const DefaultContent: ContentModel = {
    sections: 
    [
        {
            title: 'Home example',
            description: 'Will contain other sections',
            subsections: []
        } as SectionModel,
        {
            title: 'About me example',
            description: 'About me section',
            subsections: []
        } as SectionModel,
        {
            title: 'Portfolio example',
            description: 'Projects',
            subsections: 
            [
                {
                    title: 'Personal projects',
                    content: 
                    [
                        {
                            title: 'Title example',
                            description: 'Description example',
                            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            imgSrc: '',
                            demoButtonLink: 'https://google.com',
                            gitButtonLink: 'https://github.com',
                            tags: ['TypeScript', 'Angular', 'Angular Material']
                        } as CardModel,
                    ]
                }
            ]
        } as SectionModel,
    ]
} as ContentModel;



