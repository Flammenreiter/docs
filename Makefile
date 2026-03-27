.PHONY: html pdf clean all chapters

ASCIIDOCTOR = asciidoctor
ASCIIDOCTOR_PDF = asciidoctor-pdf
COMMON_OPTS = -r asciidoctor-diagram -a toc -a toclevels=3 -a icons=font -a source-highlighter=rouge -a imagesdir=images -a revdate=$(shell date +%Y-%m-%d)
PDF_OPTS = $(COMMON_OPTS) -a pdf-themesdir=theme -a pdf-theme=flammenreiter
HTML_OPTS = $(COMMON_OPTS) -a toc=left

all: html pdf

html: build/html/index.html build/html/spieler-handbuch.html

pdf: build/pdf/index.pdf build/pdf/spieler-handbuch.pdf

build/html/index.html: index.adoc
	@mkdir -p build/html
	$(ASCIIDOCTOR) $(HTML_OPTS) -D build/html index.adoc

build/html/spieler-handbuch.html: spieler-handbuch.adoc
	@mkdir -p build/html
	$(ASCIIDOCTOR) $(HTML_OPTS) -D build/html spieler-handbuch.adoc

build/pdf/index.pdf: index.adoc
	@mkdir -p build/pdf
	$(ASCIIDOCTOR_PDF) $(PDF_OPTS) -D build/pdf index.adoc

build/pdf/spieler-handbuch.pdf: spieler-handbuch.adoc
	@mkdir -p build/pdf
	$(ASCIIDOCTOR_PDF) $(PDF_OPTS) -D build/pdf spieler-handbuch.adoc

chapters:
	@mkdir -p build/pdf
	@for dir in [0-9][0-9]-*/; do \
		if [ -f "$${dir}index.adoc" ]; then \
			echo "Building $${dir}..."; \
			$(ASCIIDOCTOR_PDF) $(PDF_OPTS) -a imagesdir=../images -D build/pdf "$${dir}index.adoc"; \
		fi \
	done

clean:
	rm -rf build/
