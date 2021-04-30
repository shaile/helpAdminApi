import { Document } from 'mongoose';

interface IPaginator {
  paginate(): void;
}
export interface Assignment extends Document, IPaginator {
  readonly _id: string;
  readonly userId: string;
  readonly topic: string;
  readonly documentType: string;
  readonly subject: string;
  readonly deadLine: string;
  readonly referenceStyle: string;
  readonly paperLength: string;
  readonly academicLevel: string;  
  readonly academicOption: string;
  readonly message: string;
  readonly document_1: string;
  readonly document_2: string;
  readonly document_3: string;
  readonly document_4: string;
  readonly createdOn: Date;
  readonly updatedOn: Date;
}
