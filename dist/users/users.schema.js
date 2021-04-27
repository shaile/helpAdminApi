"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    avatar: {
        type: Object,
        default: ''
    },
    email: {
        type: String,
        unique: true
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
}, {
    collection: 'users',
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
});
//# sourceMappingURL=users.schema.js.map