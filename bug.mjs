import fetch from "node-fetch";

const URL = "http://localhost";

// #region worship service
async function post_structured_identifier() {
  const resp = await fetch(URL + "/structured-identifiers", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body: '{"data":{"attributes":{},"type":"structured-identifiers"}}',
    method: "POST",
  });
  return await resp.json();
}

async function post_identifier(id) {
  const resp = await fetch(URL + "/identifiers", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"id-name":"KBO nummer"},"relationships":{"structured-identifier":{"data":{"type":"structured-identifiers","id":"' +
      id +
      '"}}},"type":"identifiers"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function post_contact_points(type) {
  const resp = await fetch(URL + "/contact-points", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"type":"' + type + '"},"type":"contact-points"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function post_address() {
  const resp = await fetch(URL + "/addresses", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body: '{"data":{"attributes":{"number":"1","box-number":null,"street":"Kerkakker","postcode":"8340","municipality":"Damme","province":"West-Vlaanderen","address-register-uri":"https://data.vlaanderen.be/id/adres/1685852","full-address":"Kerkakker 1, 8340 Damme"},"relationships":{"source":{"data":{"type":"concepts","id":"e59c97a9-4e95-4d65-9696-756de47fbc1f"}}},"type":"addresses"}}',
    method: "POST",
  });

  return await resp.json();
}

async function post_site(address_id, primary_contact_id, secondary_contact_id) {
  const resp = await fetch(URL + "/sites", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"relationships":{"address":{"data":{"type":"addresses","id":"' +
      address_id +
      '"}},"contacts":{"data":[{"type":"contact-points","id":"' +
      primary_contact_id +
      '"},{"type":"contact-points","id":"' +
      secondary_contact_id +
      '"}]}},"type":"sites"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function post_worship_service(site, identifier_1, identifier_2) {
  const resp = await fetch(URL + "/worship-services", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"cross-border":null,"name":"atest"},"relationships":{"recognized-worship-type":{"data":{"type":"recognized-worship-types","id":"99536dd6eb0d2ef38a89efafb17e7389"}},"classification":{"data":{"type":"administrative-unit-classification-codes","id":"66ec74fd-8cfc-4e16-99c6-350b35012e86"}},"primary-site":{"data":{"type":"sites","id":"' +
      site +
      '"}},"organization-status":{"data":{"type":"organization-status-codes","id":"63cc561de9188d64ba5840a42ae8f0d6"}},"identifiers":{"data":[{"type":"identifiers","id":"' +
      identifier_1 +
      '"},{"type":"identifiers","id":"' +
      identifier_2 +
      '"}]},"is-sub-organization-of":{"data":null},"is-associated-with":{"data":{"type":"representative-bodies","id":"e224c637ba8bb0e5dfbb87da225b4652"}}},"type":"worship-services"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function post_governing_body(worship_id) {
  const resp = await fetch(URL + "/governing-bodies", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"start-date":null,"end-date":null},"relationships":{"administrative-unit":{"data":{"type":"worship-services","id":"' +
      worship_id +
      '"}},"classification":{"data":{"type":"governing-body-classification-codes","id":"04f65457bf125b2dc59fd71917ac3d08"}}},"type":"governing-bodies"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function post_governing_body_specialization(governing_body_id) {
  const resp = await fetch(URL + "/governing-bodies", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"start-date":null,"end-date":null},"relationships":{"is-time-specialization-of":{"data":{"type":"governing-bodies","id":"' +
      governing_body_id +
      '"}}},"type":"governing-bodies"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function make_worship_service() {
  let data = await post_structured_identifier();
  const structured_id_1 = data.data.id;
  data = await post_identifier(structured_id_1);
  const identifier_id_1 = data.data.id;
  data = await post_structured_identifier();
  const structured_id_2 = data.data.id;
  data = await post_identifier(structured_id_2);
  const identifier_id_2 = data.data.id;

  data = await post_contact_points("Primary");
  const primary_contact_point_id = data.data.id;
  data = await post_contact_points("Secondary");
  const secondary_contact_point_id = data.data.id;
  data = await post_address();
  const address_id = data.data.id;
  data = await post_site(
    address_id,
    primary_contact_point_id,
    secondary_contact_point_id
  );
  const site_id = data.data.id;

  data = await post_worship_service(site_id, identifier_id_1, identifier_id_2);
  const worship_id = data.data.id;
  data = await post_governing_body(worship_id);
  const governing_body = data.data.id;
  data = await post_governing_body_specialization(governing_body);
  const governing_body_specialization = data.data.id;
  return {
    structured_id_1,
    identifier_id_1,
    structured_id_2,
    identifier_id_2,
    primary_contact_point_id,
    secondary_contact_point_id,
    address_id,
    site_id,
    worship_id,
    governing_body,
    governing_body_specialization,
  };
}
// #endregion

// #region minister
async function make_contact_point_minister(addr_id) {
  const resp = await fetch(URL + "/contact-points", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"type":"Primary"},"relationships":{"contact-address":{"data":{"type":"addresses","id":"' +
      addr_id +
      '"}}},"type":"contact-points"}}',
    method: "POST",
    mode: "cors",
  });
  const json = await resp.json();
  return json.data.id;
}
async function make_minister_address() {
  const resp = await fetch(URL + "/addresses", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body: '{"data":{"attributes":{"number":"1","box-number":null,"street":"Kerkakker","postcode":"2380","municipality":"Ravels","province":"Antwerpen","address-register-uri":"https://data.vlaanderen.be/id/adres/3750041","full-address":"Kerkakker 1, 2380 Ravels"},"relationships":{"source":{"data":{"type":"concepts","id":"e59c97a9-4e95-4d65-9696-756de47fbc1f"}}},"type":"addresses"}}',
    method: "POST",
    mode: "cors",
  });
  const json = await resp.json();
  return json.data.id;
}
async function make_person_id() {
  const resp = await fetch(URL + "/people", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body: '{"data":{"attributes":{"given-name":"test","family-name":"test"},"type":"people"}}',
    method: "POST",
    mode: "cors",
  });
  const data = await resp.json();
  return data.data.id;
}

async function make_minister_position_id(worship_id) {
  const resp = await fetch(URL + "/minister-positions", {
    credentials: "include",
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"relationships":{"function":{"data":{"type":"minister-position-functions","id":"67548f1fe5bf52e5a7ad33dcce47472d"}},"worship-service":{"data":{"type":"worship-services","id":"' +
      worship_id +
      '"}}},"type":"minister-positions"}}',
    method: "POST",
  });
  const json = await resp.json();
  return json.data.id;
}

async function post_ministers(pos_id, pers_id, contact_id) {
  const resp = await fetch(URL + "/ministers", {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"attributes":{"agent-start-date":"1988-03-10","agent-end-date":null},"relationships":{"minister-position":{"data":{"type":"minister-positions","id":"' +
      pos_id +
      '"}},"financing":{"data":{"type":"financing-codes","id":"9d6f49b3d923b437ec3a91e8b5fa6885"}},"person":{"data":{"type":"people","id":"' +
      pers_id +
      '"}}},"contacts":{"data":[{"type":"contact-points","id":"' +
      contact_id +
      '"}]},"type":"ministers"}}',
    method: "POST",
    mode: "cors",
  });
  return await resp.json();
}

async function make_minister(worship_service) {
  let address_id = await make_minister_address();
  let primary_contact_id = await make_contact_point_minister(address_id);
  let person_id = await make_person_id();
  let minister_position_id = await make_minister_position_id(
    worship_service.worship_id
  );
  const data = await post_ministers(
    minister_position_id,
    person_id,
    primary_contact_id
  );
  const minister_id = data.data.id;
  return {
    address_id,
    primary_contact_id,
    person_id,
    minister_position_id,
    minister_id,
  };
}
// #endregion

async function get_worship_service_no_include(worship_id) {
  const resp = await fetch(
    `${URL}/worship-administrative-units/${worship_id}`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      method: "GET",
      mode: "cors",
    }
  );
  return await resp.json();
}
async function get_worship_service_with_includes(worship_id) {
  const resp = await fetch(
    `${URL}/worship-services/${worship_id}?include=minister-positions.function%2Cminister-positions.agents-in-position.person`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      method: "GET",
      mode: "cors",
    }
  );
  return await resp.json();
}

setTimeout(async () => {
  // CREATION OF A MINISTER & WORSHIP SERVICE
  let worship_service = await make_worship_service();
  let minister = await make_minister(worship_service);
  // END CREATION OF A MINISTER & WORSHIP SERVICE

  // CREATE A SECOND MINISTER
  await patch_contact_point(minister.address_id);
  const second_position_id = await make_minister_position_id(
    worship_service.worship_id
  );
  await post_ministers(
    second_position_id,
    minister.person_id,
    minister.primary_contact_id
  );
  // BUG REPRODUCE

  await get_worship_service_no_include(worship_service.worship_id);
  let includes_worship_service = await get_worship_service_with_includes(
    worship_service.worship_id
  );

  if (
    includes_worship_service.data.relationships["minister-positions"].data
      .length < 2
  ) {
    console.log("bug! should have included 2 ministers");
  } else {
    console.log("all good.");
  }

  process.exit(0);
}, 1000);

async function patch_contact_point(contact_point, addr_id) {
  const resp = await fetch(`${URL}/contact-points/${contact_point}`, {
    headers: {
      Accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    body:
      '{"data":{"id":"' +
      contact_point +
      '","attributes":{"type":"Primary"},"relationships":{"contact-address":{"data":{"type":"addresses","id":"' +
      addr_id +
      '"}}},"type":"contact-points"}}',
    method: "PATCH",
    mode: "cors",
  });
}
