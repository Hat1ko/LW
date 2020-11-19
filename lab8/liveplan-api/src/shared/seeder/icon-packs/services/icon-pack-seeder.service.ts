import {Injectable} from '@nestjs/common';
import {IconsService} from '../../../../modules/icons/services/icons.service';
import {SeederService} from '../../seeder.service';
import {iconPacksList} from '../data/icon-packs.list';
import {IconPackInterface} from '../interfaces/icon-pack.interface';
import {IconPacksService} from '../../../../modules/icons/services/icon-packs.service';

@Injectable()
export class IconPackSeederService {
    constructor(
        private readonly iconPacksService: IconPacksService,
        private readonly iconsService: IconsService,
    ) {
    }

    async createSeeds(): Promise<void> {
        await SeederService.clearDuplicates(iconPacksList);
        await Promise.all(iconPacksList.map(async (iconPack: IconPackInterface) => {
            if (await this.iconPacksService.findIconPackByKey(iconPack.key)) {
                return null;
            }
            return this.iconPacksService.saveIconPack(iconPack);
        }));
    }
}
