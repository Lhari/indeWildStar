<!DOCTYPE html>
<html>
    <head>
        <jdoc:include type="head" />
        <link rel="stylesheet" href="templates/wildstar/stylesheets/main.css" type="text/css" />
        <script src="templates/wildstar/all.top.min.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="size-12 fixed-top" style="z-index: 99;">
            <header>
                <div class="grid size-12">
                    <jdoc:include type="modules" name="position-1" style="xhtml" />
                </div>
            </header>
            <nav style="z-index 999;">
                <jdoc:include type="modules" name="position-2" style="xhtml" />
            </nav>
        </div>
        <div class="grid size-12 slider">
            <jdoc:include type="modules" name="position-3" style="xhtml" />
        </div>
        <div class="content-wrapper">
           <div id="content" class="grid size-12">
               <aside class="grid size-2 left">
                    <jdoc:include type="modules" name="position-4" style="xhtml" />
               </aside>
                <section class="grid size-10 article">
                    <jdoc:include type="component" />
                </section>
           </div> 
        </div>
        <footer class="grid size-12">
            <jdoc:include type="modules" name="position-14" style="xhtml" />
        </footer>
    </body>
</html>