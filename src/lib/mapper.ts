type DataMapper<ENTITY, DATA> = {
  toEntity(data: DATA): ENTITY;
  toData(entity: ENTITY): DATA;
};

export { DataMapper };
