import {Injectable} from '@nestjs/common';
import {IconsService} from '../../../../modules/icons/services/icons.service';
import {SeederService} from '../../seeder.service';
import {iconsList} from '../data/icons.list';
import {IconInterface} from '../interfaces/icon.interface';
import {HelpersService} from '../../../helpers/helpers.service';
import {IconPacksService} from '../../../../modules/icons/services/icon-packs.service';

@Injectable()
export class IconSeederService {
    constructor(
        private readonly iconsService: IconsService,
        private readonly iconPacksService: IconPacksService,
    ) {
    }

    async createSeeds(): Promise<void> {
        await SeederService.clearDuplicates(iconsList);
        await Promise.all(iconsList.map(async (icon: IconInterface) => {
            if (await this.iconsService.findIconByKey(icon.key)) {
                return null;
            }
            const iconPack = await this.iconPacksService.findIconPackByKey(icon.iconPackKey);
            if (!iconPack) {
                return null;
            }
            icon.iconPackId = iconPack._id;
            const file = await HelpersService
                .readFileFromFileSystem(icon.filePath);
            return this.iconsService.saveIcon(icon, file);
        }));
    }
}
