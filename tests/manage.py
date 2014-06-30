import sys;

def backupContent(path, content, ext=".bak"):
    back = open(path+ext, 'w+');
    back.write(content);
    back.flush();
    back.close();

def addTest(path, note):    
    newTestString = "<!-- insert new tests here -->";
    if (len(note) > 0):
        comment = "\t<!-- "+note+" -->";
    else:
        comment = "";
    testToAdd = "\t<script src=\""+path+"\"></script>";
    testFile = open("test.html", 'rw+');
    htmlContent = testFile.read();   
    backupContent("test.html", content = htmlContent);
    position = htmlContent.find(newTestString) + len(newTestString);
    after = htmlContent[position:];
    testFile.seek(position, 0);
    if (len(comment) > 0):
        testFile.write("\n"+comment);
    testFile.write("\n"+testToAdd);
    testFile.write(after);
    testFile.flush();
    testFile.close();

if (len(sys.argv) > 2):
    addTest(sys.argv[1], sys.argv[2]);
else:
    addTest(sys.argv[1], "");
