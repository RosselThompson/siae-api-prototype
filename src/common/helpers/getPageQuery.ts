import { SelectQueryBuilder } from 'typeorm';
import { PageOptionsDto } from '../dtos/page-options.dto';

export const getPageQuery = async (
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
    .take(pageOptionsDto.size);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();

  return { itemCount, entities };
};
