export class UnknownSectionError implements Error {
	name = 'UnknownSectionException';
	stack?: string;
	message = 'this section does not exist';
}
