import { SectionValidatorFactory } from './section-validator-factory';
import { NotEmptySectionValidator } from './notempty/notempty-section-validator';
describe('get section validator', () => {

    let factory: SectionValidatorFactory;

    beforeEach(() => {
        factory = new SectionValidatorFactory();
    });

    let sections = ['Given', 'When', 'Then'];

    sections.forEach((sectionName) => {
        it('should get the NotEmptySectionValidator for the section '+sectionName, () => {
            let validator = factory.getSectionValidator(sectionName);
            expect(validator instanceof NotEmptySectionValidator).toBeTruthy();
        });
    });

    it('should return an error if the section does not exist', () => {
        try{
            factory.getSectionValidator('NOT_EXISTING_SECTION');
        }catch(e){
            expect(e.name).toEqual('UnknownSectionException');
            expect(e.message).toEqual('this section does not exist');
        }
    });
    
})