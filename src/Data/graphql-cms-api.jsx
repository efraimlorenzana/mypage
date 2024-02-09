// const GRAPHCMS_ENDPOINT = `https://api-apeast.graphcms.com/v1/ck1d1pnat1vxf01c0f95o6ztd/master`;
const GRAPHCMS_ENDPOINT = `https://api-ap-northeast-1.graphcms.com/v2/ck1d1pnat1vxf01c0f95o6ztd/master`;

let personalInfo = `
personalInfoes {
    firstname
    middlename
    lastname
    bio
    professionTitle
    bannerImage {
      id
      url
      handle
      fileName
    }
    avatar {
        handle
    }
}`;

let skills = `
skillSets (stage: PUBLISHED) {
  stage
  technology
  knowledgeLevel
}`;

let projects = `
projects (stage: PUBLISHED) {
    stage
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
achievements (stage: PUBLISHED) {
    stage
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
  workHistories (stage: PUBLISHED) {
    stage
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
    stage
    id
    title
    viewBox
    path
    iconClass
    fill
  }`;

  let SocialAccounts = `
  socialAccounts (stage: PUBLISHED) {
    stage
    id
    organization
    link
    svgIcon {
      id
    }
  }`;

  let techs = `
  technologies (stage: PUBLISHED) {
    stage
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
  contactDetailses (stage: PUBLISHED) {
    stage
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

  let resume = `
  resumes (stage: PUBLISHED) {
    url
    navigationLinkText
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
    ${contacts},
    ${resume}
}`;

module.exports = {
    GRAPHCMS_ENDPOINT,
    GRAPHQL_QUERY_ALL
}