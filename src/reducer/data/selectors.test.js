import NameSpace from "../name-spaces";
import {
  receiveCitiesListSelector,
  receiveCityInfoSelector,
  receiveCityOffersSelector,
  receiveOfferSelector,
  receiveCityOffersSortedSelector, receiveFavoriteSelector, getFavoriteStatusSelector
} from "./selectors";
import {offersData} from "../../mocks/offer-data";


const NAME_SPACE = NameSpace.DATA;

describe(`Selectors work correctly`, () => {
  it(`Selector for receiving offers returns correct value`, () => {
    expect(receiveCityOffersSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: [offersData[0], offersData[1], offersData[2]]
      }
    })).toEqual([offersData[0], offersData[1]]);
  });

  it(`Selector for receiving sorted offers returns correct value`, () => {
    expect(receiveCityOffersSortedSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        sortingOrder: `to-high`,
        offers: [offersData[0], offersData[1], offersData[2], offersData[3]]
      }
    })).toEqual([offersData[1], offersData[3], offersData[0]]);
  });

  it(`Selector for receiving city coordinates returns correct value`, () => {
    expect(receiveCitiesListSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: [
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Paris`,
              location: []
            }
          }
        ]
      }
    })).toEqual([
      {
        name: `Amsterdam`,
        location: []
      },
      {
        name: `Paris`,
        location: []
      }
    ]);
  });

  it(`Selector for receiving list of cities returns correct value`, () => {
    expect(receiveCityInfoSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: offersData
      }
    })).toEqual({
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    });
  });

  it(`Selector for receiving offer by id works correctly`, () => {
    expect(receiveOfferSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: offersData
      }
    }, 1)).toEqual(offersData[0]);
  });

  it(`Selector for receiving favorite offers returns correct value`, () => {
    expect(receiveFavoriteSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: [{fake: true}],
        favorite: offersData,
        sortingOrder: `popular`,
        comments: {fake: true},
      }
    })).toEqual([
      {
        city: `Amsterdam`,
        offers: [offersData[0], offersData[1], offersData[3], offersData[4], offersData[5], offersData[6]]
      },
      {
        city: `Tel Aviv`,
        offers: [offersData[2]]
      },
      {
        city: `Paris`,
        offers: [offersData[7], offersData[8]]
      }
    ]);
  });

  it(`Selector for getting favorite status works correctly`, () => {
    expect(getFavoriteStatusSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: offersData,
        favorite: [{fake: true}],
        sortingOrder: `popular`,
        comments: {fake: true},
      }
    }, 1)).toEqual(false);
  });
});
