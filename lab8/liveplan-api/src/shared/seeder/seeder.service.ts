import {Injectable, Logger} from '@nestjs/common';
import {IconSeederService} from './icons/services/icon-seeder.service';
import {IconPackSeederService} from './icon-packs/services/icon-pack-seeder.service';

@Injectable()
export class SeederService {
    constructor(
        private readonly iconSeederService: IconSeederService,
        private readonly iconPackSeederService: IconPackSeederService,
        private readonly logger: Logger,
    ) {
    }

    static async clearDuplicates(array: any[]) {
        return array.filter((element, index, self) =>
            index === self.findIndex((t) => (
                t.key === element.key
            )),
        );
    }

    async seed() {
        this.logger.debug('Start seeding...');
        await this.iconPackSeederService.createSeeds();
        await this.iconSeederService.createSeeds();
        this.logger.debug('Seeding finish.');
    }
}
