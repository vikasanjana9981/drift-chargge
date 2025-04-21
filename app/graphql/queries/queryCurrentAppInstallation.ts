import { CURRENT_APP_INSTALLATION_FRAGMENT } from "../fragments/currentAppInstallation";

export const CURRENT_APP_INSTALLATION = `#graphql
    ${CURRENT_APP_INSTALLATION_FRAGMENT}
    query CurrentAppInstallation {
        currentAppInstallation {
            ...currentAppInstallation
        }
    }
`;