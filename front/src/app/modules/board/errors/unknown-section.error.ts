export class UnknownSectionError implements Error {
    name: string = 'UnknownSectionException';
    stack?: string;
    message = 'this section does not exist';
}