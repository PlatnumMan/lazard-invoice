ARG NODE_VERSION=18-alpine3.15

FROM node:${NODE_VERSION}

LABEL name="lazard-invoice"
LABEL license="MIT"
LABEL description="Lazard Invoice image"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

RUN addgroup --system invoice \
    && adduser --system --ingroup invoice invoice

COPY  package*.json ./

RUN npm install

COPY --chown=invoice:invoice . .

RUN chown invoice:invoice ${APP_HOME}

USER invoice

CMD ["npm", "run", "dev"]