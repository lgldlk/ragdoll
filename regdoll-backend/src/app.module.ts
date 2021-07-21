import { ChemicalReactionService } from './system/ChemicalReaction/chemicalreaction.service';
import { ChemicalReactionController } from './system/ChemicalReaction/chemicalreaction.controller';
import { ChemicalReactionModule } from './system/ChemicalReaction/chemicalreaction.module';
import { UserService } from './system/User/user.service';
import { UserController } from './system/User/user.controller';
import { UserModule } from './system/User/user.module';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 14:57:04
 */
import { SceneBackgroundService } from './system/SceneBackroungd/scenebackground.service';
import { SceneBackgroundController } from './system/SceneBackroungd/scenebackground.controller';
import { SceneBackgroundModule } from './system/SceneBackroungd/scenebackground.module';
import { ImageService } from './system/Image/image.service';
import { ImageController } from './system/Image/image.controller';
import { ImageModule } from './system/Image/image.module';
import { MoleculeService } from './system/Molecule/molecule.service';
import { MoleculeController } from './system/Molecule/molecule.controller';
import { MoleculeModule } from './system/Molecule/molecule.module';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-17 09:03:03
 */
import { AtomModule } from './system/atom/atom.module';
import { SystemModule } from './system/system.module';
import { AtomService } from './system/atom/atom.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/config.module';

@Module({
  imports: [
    ChemicalReactionModule,
    UserModule,
    SceneBackgroundModule,
    ImageModule,
    MoleculeModule, SystemModule, DatabaseModule, SwaggerConfigModule],
  controllers: [


  ],
  providers: [



  ],
})
export class AppModule { }
