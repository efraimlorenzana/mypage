// const GRAPHCMS_ENDPOINT = `https://api-apeast.graphcms.com/v1/ck1d1pnat1vxf01c0f95o6ztd/master`;
const GRAPHCMS_ENDPOINT = `https://api-ap-northeast-1.graphcms.com/v2/ck1d1pnat1vxf01c0f95o6ztd/master`;

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
    githubIcon {
      id
    }
    projectSiteLinkIconAvailable {
      id
    }
    projectSiteLinkIconNotAvailable {
      id
    }
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

  let SVGIcons = `
  svgIcons {
    status
    id
    title
    viewBox
    path
    iconClass
    fill
  }`;

  let SocialAccounts = `
  socialAccounts {
    status
    id
    organization
    link
    svgIcon {
      id
    }
  }`;

  let techs = `
  technologies{
    status
    id
    languageName
    svgIcon {
      id
    }
    icon {
      id
      handle
    }
  }`;

  let contacts = `
  contactDetailses {
    status
    id
    title
    type
    info
    svgIcon {
      id
    }
    mediaIcon {
      handle
    }
  }`;

const GRAPHQL_QUERY_ALL = `{
    ${personalInfo},
    ${skills},
    ${projects},
    ${achievements},
    ${workHistories},
    ${SVGIcons},
    ${SocialAccounts},
    ${techs},
    ${contacts}
}`;

module.exports = {
    GRAPHCMS_ENDPOINT,
    GRAPHQL_QUERY_ALL
}