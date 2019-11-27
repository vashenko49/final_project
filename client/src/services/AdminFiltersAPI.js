export default class AdminFiltersAPI {
  static data = [
    {
      id: '0',
      title: 'Filter 1',
      subFilter: [
        {
          id: '00',
          title: 'sub filter 0 1'
        },
        {
          id: '01',
          title: 'sub filter 0 2'
        }
      ]
    },
    {
      id: '1',
      title: 'Filter 2',
      subFilter: [
        {
          id: '10',
          title: 'sub filter 1 1'
        },
        {
          id: '11',
          title: 'sub filter 1 2'
        }
      ]
    },
    {
      id: '2',
      title: 'Filter 3',
      subFilter: [
        {
          id: '20',
          title: 'sub filter 2 1'
        },
        {
          id: '21',
          title: 'sub filter 2 2'
        }
      ]
    }
  ];

  static getFilters() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }

  static getFiltersById(id) {
    return new Promise((resolve, reject) => {
      resolve(this.data.filter(i => i.id == id));
    });
  }
}
