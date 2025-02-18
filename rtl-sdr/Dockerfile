FROM alpine:3.18

ENV RTL_SDR_OUTPUT_HOST="230.230.230.230"
ENV RTL_SDR_OUTPUT_PORT=55501

RUN apk add --no-cache \
    build-base \
    cmake \
    git \
    librtlsdr-dev \
    pkgconf \
    rtl-sdr

WORKDIR /app
RUN git clone https://github.com/dgiardini/rtl-ais.git \
    && cd rtl-ais \
    && make \
    && mv rtl_ais /usr/local/bin/ \
    && rm -rf /app/rtl-ais

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh", "2>&1"]