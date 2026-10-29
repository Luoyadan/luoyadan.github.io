FROM ruby:3.4.12-trixie@sha256:1e780a5d685488264025a4cadaf366fb2c5dca9847f1a3b1d438fcaa69d8950d

RUN apt-get update \
    && apt-get install -y --no-install-recommends imagemagick \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /srv/jekyll
ENV BUNDLE_FROZEN=true
COPY Gemfile Gemfile.lock ./
RUN bundle _2.6.9_ install --jobs 4
