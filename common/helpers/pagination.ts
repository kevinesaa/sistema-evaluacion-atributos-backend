

interface IPagination {
    currentPage: number;
    limit: number;
    maxPages: number;
    totalItems: number;
    skip: number;
}


interface IContainer {
    dataSet:any[],
    pagination?:IPagination
}

const MAX_ITEMS_BY_DEFAULT = 30;

export const Pagination = (dataSetLength:number,page:any = 1,limit:any = MAX_ITEMS_BY_DEFAULT) :IPagination=> {
    
    const myPage = (page && (page >= 0))?Number(page):1;
    const myLimit = (limit && (limit >= 1))?Number(limit):MAX_ITEMS_BY_DEFAULT;
    const maxPages = Math.ceil(dataSetLength / limit)
    const skip = (myPage - 1) * myLimit;
    const pagination = {
      currentPage: myPage,
      limit: myLimit,
      maxPages: maxPages,
      totalItems: dataSetLength,
      skip: (skip<0) ? 0 : skip
    };

    return pagination;
}


export const PaginationResults = (dataSet:any[], pagination:IPagination) => {
    const container:IContainer = {
        dataSet:[],
        pagination:undefined
    };
    
    if(pagination.currentPage === 0) {
        container.dataSet = dataSet;
    }
    else {
        container.pagination = pagination;
        if(pagination.skip < dataSet.length) {
            const maxAux = ((pagination.skip + pagination.limit) <= dataSet.length) ? pagination.limit:dataSet.length;
            const sliceDataSet = dataSet.slice(pagination.skip,maxAux);
            container.dataSet = sliceDataSet;   
        }
    }
    return container;
}