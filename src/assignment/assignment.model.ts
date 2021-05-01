export class CreateAssignmentModel{
    // eslint-disable-next-line @typescript-eslint/ban-types
    userId: string;
    topic: string;
    documentType: string;
    subject: string;
    deadLine: Date;
    referenceStyle: string;
    paperLength: string;
    academicLevel: string;  
    academicOption: string;
    message: string;
    document_1: string;
    document_2: string;
    document_3: string;
    document_4: string;
}

export class CreateAssignmentDto{
    // eslint-disable-next-line @typescript-eslint/ban-types
    email: string;
    topic: string;
    documentType: string;
    subject: string;
    deadLine: Date;
    referenceStyle: string;
    paperLength: string;
    academicLevel: string;  
    academicOption: string;
    message: string;
    document_1: string;
    document_2: string;
    document_3: string;
    document_4: string;
}