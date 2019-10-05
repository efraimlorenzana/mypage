const GRAPHCMS_ENDPOINT = `https://api-apeast.graphcms.com/v1/ck1d1pnat1vxf01c0f95o6ztd/master`;

let personalInfo = `
personalInfoes {
    firstname
    middlename
    lastname
    bio
    professionTitle
    avatar {
        handle
    }
}`;

let skills = `
skillSets {
    status
    technology
    knowledgeLevel
}`;

let projects = `
projects {
    status
    posterImage {
       handle
    }
    title
    description
    technology
    domainName
    github
}`;

let achievements = `
achievements {
    status
    title
    source
    issuer
    dateAcquired
    certificate {
      handle
    }
    googleDriveLocation
  }`;

  let workHistories = `
  workHistories {
    status
    id
    logo {
      handle
    }
    company
    durationFrom
    durationTo
    role
    industry
    department
    brandColorTag
    cardPosition
    jobDescription
  }`;

const GRAPHQL_QUERY_ALL = `{
    ${personalInfo},
    ${skills},
    ${projects},
    ${achievements},
    ${workHistories}
}`;

module.exports = {
    GRAPHCMS_ENDPOINT,
    GRAPHQL_QUERY_ALL
}