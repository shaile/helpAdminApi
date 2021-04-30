import * as mongoose from 'mongoose';
// import * as mongoosePaginate from 'mongoose-paginate-v2';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: {
      type: Object,
      default: ''
    },
    email: {
        type: String,
        unique: true // `email` must be unique
      },
    address: {
      type: Object,
      default: ''
    },
    phone: String,
    createdOn: Date,
    updatedOn: Date,
    password: String,
    createdBy: String,
    updatedBy: String
  },
  {
    collection: 'users',
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
  }
);

// UserSchema.plugin(mongoosePaginate);
