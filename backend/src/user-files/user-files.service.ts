import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserFiles } from './user-files.interface';

@Component()
export class UserFilesService {

  constructor(@Inject('UserFilesModelToken') private readonly userFilesModel: Model<UserFiles>) {
  }

  async getAllFiles(userId, cb) {
    const dateNow = (new Date()).toISOString();
    return await this.userFilesModel.find({userId: userId, endDate: {$gt: dateNow}}).exec(cb);
  }

  async getLastUserFile(userId, key): Promise<UserFiles> {
    const dateNow = (new Date()).toISOString();
    return await this.userFilesModel.findOne({userId: userId, endDate: {$gt: dateNow}, key: key}).exec();
  }

  async getFileVersions(userId, key): Promise<UserFiles[]> {
    return await this.userFilesModel.find({userId: userId, key: key}).exec();
  }

  async updateUserFile(userId, key, value, cb): Promise<any> {
    const dateNow = (new Date()).toISOString();
    this.userFilesModel
      .update({userId: userId, key: key, endDate: {$gt: dateNow}},
        {
          $set: {
            'endDate': dateNow
          }
        }
      )
      .exec();

    const newFile = {
      key: key,
      userId: userId,
      value: value,
      startDate: dateNow,
      endDate: (new Date('3000-01-01')).toISOString()
    };
    const createdFile = new this.userFilesModel(newFile);
    return await createdFile.save(cb);
  }

  async deleteFile(userId, currentFile) {
    this.userFilesModel
      .find({userId: userId, key: currentFile})
      .remove()
      .exec()
      .then(() => {
        return console.log('Delete file successfully!');
      });
  }

  async renameFile(userId, file, newFileName, cb) {
    console.log(userId, file, newFileName);
    this.userFilesModel
      .update({userId: userId, key: file}, {$set: {key: newFileName}}, {multi: true})
      .lean()
      .exec(cb);
  }
}
