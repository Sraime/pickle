import { HttpOptionsBuilder } from './HttpOptionsBuilder'

describe('HttpOptionsBuilder', () => {
    
    describe('getHeader', () => {
        
        let httpob
        beforeEach(() => {
            httpob = new HttpOptionsBuilder();
        });

        describe('default config', () => {
            let h;
            beforeEach(() => {
                h = httpob.getHeader();
            });

            it('should return a HttpHeaders', () => {
                expect(h).toBeTruthy();
            });
    
            it('should have application/json as Content-Type', () => {
                expect(h.get('Content-Type')).toEqual('application/json');
            });
        });
       

        it('should inject my given Authorization config in param', () => {
            let h = httpob.getHeader({'Authorization': 'my-auth-token'});
            expect(h.get('Authorization')).toEqual('my-auth-token');
        });

        it('should overide Content-Type with application/xml', () => {
            let h = httpob.getHeader({'Content-Type': 'application/xml'});
            expect(h.get('Content-Type')).toEqual('application/xml');
        });

    });
});