import Fetch from './helpers/http';
import { METHODS } from './helpers/config';

const filterToParams = filters =>
  filters
    ? Object.keys(filters)
        .map(key => {
          return filters[key] instanceof Array
            ? filters[key].flatMap(it => `${key}[]=${it}&`).join('')
            : `${key}=${filters[key]}&`;
        })
        .join('')
    : '';

export default {
  // Here will all the API methods be

  // --- WARNINGS ---
  getWarnings: filters => {
    return new Fetch(METHODS.get, '/warning?' + filterToParams(filters));
  },

  getWarning: id => {
    return new Fetch(METHODS.get, `/warning/${id}`);
  },

  getWarningContent: id => {
    return new Fetch(METHODS.get, '/warning/content/'.concat(id));
  },

  getWarningsClose: (lat, lng, filters) => {
    return new Fetch(
      METHODS.get,
      `/warning/close/${lat}/${lng}?`.concat(filterToParams(filters))
    );
  },

  createWarning: data => {
    return new Fetch(METHODS.post, '/warning', data);
  },

  updateWarning: (id, data) => {
    return new Fetch(METHODS.put, `/warning/${id}`, data);
  },

  commentOnWarning: (warningId, image, comment) => {
    return new Fetch(METHODS.post, '/warning/comment', {
      warningId: warningId,
      image: image,
      content: comment
    });
  },

  addWarningImage: (id, image) => {
    return new Fetch(METHODS.post, '/warning/image', {
      warningId: id,
      image: image
    });
  },

  addStatus: data => {
    return new Fetch(METHODS.post, '/warning/status', {
      warningId: data.warningId,
      type: data.type,
      description: data.description
    });
  },

  // --- CATEGORIES ---
  getCategories: () => {
    return new Fetch(METHODS.get, '/warning/category');
  },

  getCategoryById: (id) => {
    return new Fetch(METHODS.get, `/warning/category/${id}`);
  },

  // --- CONTRACTS ---
  createContract: (warningId, groupId, description) => {
    return new Fetch(METHODS.post, '/warning/contract', {
      warningId: warningId,
      groupId: groupId,
      comment: description
    });
  },

  getContracts: () => {
    return new Fetch(METHODS.get, '/warning/contract');
  },

  // --- MUNICIPALITIES ---
  getMunicipalities: () => {
    return new Fetch(METHODS.get, '/location/municipality');
  },

  // --- COMPANIES ---
  getAllCompanies: () => {
    return new Fetch(METHODS.get, '/user/group?onlyCompanies=true');
  },
  // --- EVENTS ---

  getAllEvents: () => {
    return new Fetch(METHODS.get, '/event');
  },
  getEventById: id => {
    return new Fetch(METHODS.get, '/event/'.concat(id));
  },
  getMunicipalityEvent: municipalityId => {
    return new Fetch(
      METHODS.get,
      '/event/municipality/'.concat(municipalityId)
    );
  },
  createEvent: data => {
    return new Fetch(METHODS.post, '/event', data);
  },
  updateEvent: (id, data) => {
    return new Fetch(METHODS.put, '/event/'.concat(id), data);
  },
  addEventImage: (id, image) => {
    return new Fetch(METHODS.post, '/event/image', {
      eventId: id,
      image: image
    });
  },
  getEventContent: id => {
    return new Fetch(METHODS.get, '/event/content/'.concat(id));
  },

    // --- InterestGroup ---  method, url, data = null, args = {}, withAuth = true

    subscribeToAWarning: (warningId) =>{
      return new Fetch(METHODS.post, '/interestGroup/subscribe/'.concat(warningId), {}, {}, true)
    },

    unSubscribeToAWarning: (warningId) =>{
        return new Fetch(METHODS.delete, '/interestGroup/subscribe/'.concat(warningId),{}, {}, true)
    }

};
