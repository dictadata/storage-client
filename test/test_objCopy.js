

import objCopy from '../lib/utils/objCopy.js'

let tracts = {
  "template": {
    "action": "transfer",
    "description": "See API examples at https://api.census.gov/data/2020/dec/pl/examples.html",
    "origin": {
      "smt": "rest|https://api.census.gov/data/2020/dec/|pl|*",
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N"
        },
        "http": {
          "headers": {
            "Accept": "application/json",
            "User-Agent": "@dictadata.net/storage contact:info@dictadata.net"
          }
        },
        "header": true
      }
    },
    "terminal": {
      "smt": "json|stream:*|*|*"
    }
  },
  "state": {
    "action": "transfer",
    "origin": {
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N",
          "for": "state:${STATE}"
        }
      }
    },
    "transform": {
      "mutate": {
        "map": {
          "GEO_ID": "GEO_ID",
          "NAME": "NAME",
          "P1_001N": "Population",
          "P3_001N": "Voting Age",
          "state": "STATE"
        }
      }
    }
  },
  "county": {
    "action": "transfer",
    "origin": {
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N",
          "for": "county:${COUNTY}",
          "in": "state:${STATE}"
        }
      }
    },
    "transform": {
      "mutate": {
        "map": {
          "GEO_ID": "GEO_ID",
          "NAME": "NAME",
          "P1_001N": "Population",
          "P3_001N": "Voting Age",
          "state": "STATE",
          "county": "COUNTY"
        }
      }
    }
  },
  "cd": {
    "action": "transfer",
    "origin": {
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N",
          "for": "congressional district:${DISTRICT}",
          "in": "state:${STATE}"
        }
      }
    },
    "transform": {
      "mutate": {
        "map": {
          "GEO_ID": "GEO_ID",
          "NAME": "NAME",
          "P1_001N": "Population",
          "P3_001N": "Voting Age",
          "state": "STATE",
          "congressional district": "DISTRICT"
        }
      }
    }
  },
  "sldu": {
    "action": "transfer",
    "origin": {
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N",
          "for": "state legislative district (upper chamber):${DISTRICT}",
          "in": "state:${STATE}"
        }
      }
    },
    "transform": {
      "mutate": {
        "map": {
          "GEO_ID": "GEO_ID",
          "NAME": "NAME",
          "P1_001N": "Population",
          "P3_001N": "Voting Age",
          "state": "STATE",
          "state legislative district (upper chamber)": "DISTRICT"
        }
      }
    }
  },
  "sldl": {
    "action": "transfer",
    "origin": {
      "options": {
        "params": {
          "get": "GEO_ID,NAME,P1_001N,P3_001N",
          "for": "state legislative district (lower chamber):${DISTRICT}",
          "in": "state:${STATE}"
        }
      }
    },
    "transform": {
      "mutate": {
        "map": {
          "GEO_ID": "GEO_ID",
          "NAME": "NAME",
          "P1_001N": "Population",
          "P3_001N": "Voting Age",
          "state": "STATE",
          "state legislative district (lower chamber)": "DISTRICT"
        }
      }
    }
  }
}

let tract = objCopy({}, tracts[ "template" ], tracts[ "county" ])

console.log(JSON.stringify(tract,null,2))
