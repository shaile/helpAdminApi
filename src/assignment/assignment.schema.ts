/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import * as mongoosePaginate from 'mongoose-paginate-v2';
mongoose.set('debug', true);

export const AssignmentSchema = new mongoose.Schema(
  {
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    topic: String,
    documentType: String,   
    subject: String,
    deadLine: String,
    referenceStyle: String,
    paperLength: String,
    academicLevel: String, 
    academicOption: String,
    message: String,
    document_1: {
      type: Array,
      default: ''
    },
    document_2: {
      type: Array,
      default: ''
    },
    document_3: {
      type: Array,
      default: ''
    },
    document_4: {
      type: Array,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    },
    createdBy: String,
    updatedBy: String
  },
  {
    collection: 'assignments',
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
  }
);

AssignmentSchema.plugin(mongoosePaginate);
