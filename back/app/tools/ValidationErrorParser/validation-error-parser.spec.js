const parser = require('./validation-error-parser');

describe('validation-error-perser', ()  => {

    describe('parseError()', () => {
        
        it('should return an array with the pseudo error error when the Validator error is a to short pseudo', () => {
            const error = { 
                errors:
                { 
                    pseudo: { 
                        kind: 'minlength',
                    }
                }
            };
            
            let parsedError = parser.parseError(error);
            expect(parsedError).toEqual([['pseudo',['minlength']]])
        });
        
        it('should return an array with the email error when the Validator error is a to long email', () => {
            const error = { 
                errors:
                { 
                    email: { 
                        kind: 'maxlengh',
                    }
                }
            };
            
            let parsedError = parser.parseError(error);
            expect(parsedError).toEqual([['email',['maxlengh']]])
        });

        it('should return an array of two categorised errors when email and pseudo are uniques', () => {
            const error = { 
                errors:
                { 
                    email: { 
                        kind: 'unique',
                    },
                    pseudo: { 
                        kind: 'unique',
                    },
                }
            };
            
            let parsedError = parser.parseError(error);
            expect(parsedError).toEqual([['email',['unique']],['pseudo',['unique']]])
        });

        it('should return null when there is not Validation errors', () => {
            const err = {};
            let parsedError = parser.parseError(err);
            expect(parsedError).toEqual(null);
        });
    });
})