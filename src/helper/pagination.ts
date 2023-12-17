"use strict";

const { has, toNumber, isUndefined } = require("lodash/fp");
const { ValidationError } = require("@strapi/utils").errors;

const getLimitConfigDefaults = () => ({
  defaultLimit: toNumber(strapi.config.get("api.rest.defaultLimit", 25)),
  maxLimit: toNumber(strapi.config.get("api.rest.maxLimit")) || null,
});

const shouldApplyMaxLimit = (
  limit,
  maxLimit = null,
  { isPagedPagination = false } = {},
) => (!isPagedPagination && limit === -1) || (maxLimit && limit > maxLimit);

export const shouldCount = (params) => {
  if (has("pagination.withCount", params)) {
    const { withCount } = params.pagination;

    if (typeof withCount === "boolean") {
      return withCount;
    }

    if (["true", "t", "1", 1].includes(withCount)) {
      return true;
    }

    if (["false", "f", "0", 0].includes(withCount)) {
      return false;
    }

    throw new ValidationError(
      'Invalid withCount parameter. Expected "t","1","true","false","0","f"',
    );
  }

  return Boolean(strapi.config.get("api.rest.withCount", true));
};

const isOffsetPagination = (pagination) =>
  has("start", pagination) || has("limit", pagination);
const isPagedPagination = (pagination) =>
  has("page", pagination) || has("pageSize", pagination);

export const getPaginationInfo = (params) => {
  const { defaultLimit, maxLimit } = getLimitConfigDefaults();

  const { pagination } = params;

  const isPaged = isPagedPagination(pagination);
  const isOffset = isOffsetPagination(pagination);

  if (!isPaged && !isOffset) {
    return {};
  }

  if (isOffset && isPaged) {
    throw new ValidationError(
      "Invalid pagination parameters. Expected either start/limit or page/pageSize",
    );
  }

  if (isPagedPagination(pagination)) {
    if (isUndefined(pagination.page) || isUndefined(pagination.pageSize)) {
      return {};
    }
    const pageSize = Math.max(1, toNumber(pagination.pageSize));

    return {
      page: Math.max(1, toNumber(pagination.page || 1)),
      pageSize: shouldApplyMaxLimit(pageSize, maxLimit, {
        isPagedPagination: true,
      })
        ? maxLimit
        : Math.max(1, pageSize),
    };
  }

  if (isUndefined(pagination.limit) || isUndefined(pagination.start)) {
    return {};
  }
  const limit = toNumber(pagination.limit);

  return {
    start: Math.max(0, toNumber(pagination.start || 0)),
    limit: shouldApplyMaxLimit(limit, maxLimit)
      ? maxLimit || -1
      : Math.max(1, limit),
  };
};

export const convertPagedToStartLimit = (pagination: any) => {
  if (isPagedPagination(pagination)) {
    const { page, pageSize } = pagination;
    return {
      start: (page - 1) * pageSize,
      limit: pageSize,
    };
  }

  return pagination;
};

export const transformPaginationResponse = (paginationInfo, count) => {
  if (paginationInfo.page) {
    return {
      ...paginationInfo,
      pageCount: Math.ceil(count / paginationInfo.pageSize),
      total: count,
    };
  }

  return {
    ...paginationInfo,
    total: count,
  };
};
