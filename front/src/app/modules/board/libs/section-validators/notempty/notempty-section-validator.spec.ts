import { NotEmptySectionValidator } from './notempty-section-validator';
import { Step } from '../../../interfaces/step';
describe('validate', () => {

    let validator;

    beforeEach(() => {
        validator = new NotEmptySectionValidator();
    });

    it('should return true when the list is not empty', () => {
        const steps: Step[] = [{name: 'step1'}];
        const valid = validator.validate(steps);
        expect(valid).toEqual(true);
    });

    it('should return false when the list is empty', () => {
        const steps: Step[] = [];
        const valid = validator.validate(steps);
        expect(valid).toEqual(false);
    });
});
