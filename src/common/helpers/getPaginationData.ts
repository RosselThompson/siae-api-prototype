import { SelectQueryBuilder } from 'typeorm';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { PageDto } from '../dtos/page.dto';

export const getPaginationData = async (
  entityName: string,
  pageOptionsDto: PageOptionsDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const defaultPageOptions = new PageOptionsDto();
  const pageConfig: PageOptionsDto = {
    ...defaultPageOptions,
    ...pageOptionsDto,
  };
  const skip = (pageConfig.page - 1) * pageConfig.size;

  queryBuilder
    .orderBy(`${entityName}.${pageConfig.sortBy}`, pageConfig.orderBy)
    .skip(skip)
    .take(pageConfig.size);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();
  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto: pageConfig,
  });

  return new PageDto(entities, pageMetaDto);
};
