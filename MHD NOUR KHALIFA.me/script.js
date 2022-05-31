var chr_time = 5;
var lin_time = 100;
var intro = [
    "Welcome to the MHD NOUR KHALIFA",
    "",
    "To get a list of commands, type ´help´ at any time, or ´man <command>´ for a detailed list of the command <command>.",
    "MHD NOUR KHALIFA comes with ABSOLUTELY NO WARRANTY, enjoy!"
];

const msg = {
    NORMAL: 0,
    ERROR: 1,
    INFO: 2,
    WARN: 3
};

var xterm = document.getElementsByClassName('xterm-terminal')[0];

var commands = [{
        command: 'id',
        help: 'Print user and group information for each specified USER, or (when USER omitted) for the current user.',
        exec: function() {
            printLn("uid=0(root) gid=0(root) groups=0(root)");
        }
    },
    {
        command: 'uname',
        help: 'Print certain system information.',
        exec: function() {
            printLn("Linux");
        }
    },
    {
        command: 'uname -a',
        help: 'Print certain system information.',
        exec: function() {
            printLn("Linux 0xBl4ck 5.16.0-kali6-amd64 #1 SMP PREEMPT Debian 5.16.14-1kali2 (2022-03-23) x86_64 GNU/Linux");
        }
    },
    {
        command: 'whoami',
        help: 'It tells you information about me!',
        exec: function() {
            printLn("Hello there,\nI am MHD NOUR Khalifa,\nA Cyber Security mentor since 2019.\nCTF events such as HUSN that was hosted by HUSN. Lastly,\nBug bounty and Penetration Tester,\nProgrammer ,Languages he know : HTML, PHP, JavaScript, Python, Bash Script.\nHe holds several certificates in the CTF Competition. Like,\ncertificate Cyber Security Foundation Professional,\neLearn Security Junior Penetration Tester eJPT. Recently,\nHe is the number 2000 rank worldwide in TryHackMe platform.\n.", msg.NORMAL);
        }
    },
    {
        command: 'pwd',
        help: 'Print the full filename of the current working directory.',
        exec: function() {
            printLn("/root");
        }
    },
    {
        command: 'ls',
        help: 'List  information  about  the FILEs (the current directory by default).',
        exec: function() {
            printLn("mhdkhalifa.txt Youtube.txt");
        }
    },
    {
        command: 'cat',
        help: 'Concatenate FILE(s) to standard output.',
        exec: function() {
            printLn("");
        }
    },
    {
        command: 'cat Youtube.txt',
        help: '',
        exec: function() {
            printLn("https://www.youtube.com/channel/UCuClojtzUZUPilepZ7SJj3g");
        }
    },
    {
        command: 'cat mhdkhalifa.txt',
        help: '',
        exec: function() {
            printLn("https://mhdkhalifa.netlify.app/");
        }
    },
    {
        command: 'clear',
        help: 'clears the console output',
        exec: function() {
            var childs = xterm.querySelectorAll('P');
            childs.forEach(function(node, i) {
                xterm.removeChild(node);
            });
        }
    }
];

window.onload = function() {
    var line_counter = 0;
    var input = (function() {
        var i = document.createElement('div');
        i.className = 'command-enter';
        i.style.display = 'none';

        xterm.appendChild(i);
        return i;
    })();

    var fixPrompt = function() {
        xterm.appendChild(input);
        input.style.display = 'block';
    }

    var resetLine = function() {
        line_counter++;

        var l = document.createElement('P');
        l.className = 'line_' + line_counter;

        xterm.appendChild(l);
    };

    printChr = function(chr) {
        chr = chr[0];

        var last_line = function() {
            var q = xterm.querySelectorAll('P');
            return q[q.length - 1];
        };

        if (chr === "\n" || last_line().textContent.length > 79) {
            resetLine();
        }

        if (chr === " ") {
            var whitespace = document.createElement('I');
            whitespace.innerHTML = "&middot;";
            whitespace.className = "middot";

            last_line().appendChild(whitespace);
        } else {
            last_line().appendChild(document.createTextNode(chr));
        }
    };

    printLn = function(str, type) {
        str = str.trim();

        var last_line = function() {
            var q = xterm.querySelectorAll('P');
            return q[q.length - 1];
        };

        var lines = (function() {
            var len = 80;
            var curr = len;
            var prev = 0;

            output = [];

            while (str[curr]) {
                if (str[curr++] == ' ') {
                    output.push(str.substring(prev, curr));
                    prev = curr;
                    curr += len;
                }
            }
            output.push(str.substr(prev));

            return output;
        })();

        resetLine();

        type = (function() {
            switch (type) {
                case msg.ERROR:
                    return "line-error";
                    break;
                case msg.INFO:
                    return "line-info";
                    break;
                case msg.WARN:
                    return "line-warn";
                    break;
                case msg.NORMAL:
                    return "line-normal";
                    break;
                default:
                    return "";
                    break;
            }
        })();

        var delayedPrint = function(lin, chr) {
            if (lin < lines.length) {
                last_line().className = type;

                if (chr < lines[lin].length) {
                    setTimeout(function() {
                        last_line().appendChild(document.createTextNode(lines[lin][chr]));
                        chr++;
                        delayedPrint(lin, chr);
                    }, chr_time);
                } else {
                    lin++;
                    setTimeout(function() {
                        last_line().appendChild(document.createTextNode("\n"));
                        delayedPrint(lin, 0);
                    }, lin_time);
                }
            } else {
                return false;
            }
        };

        delayedPrint(0, 0);
    };

    var addChrToCommandQueue = function(chr) {
        input.textContent += chr;
    }

    var removeChrAtIndexFromQueue = function(index) {
        if (index < 0) {
            input.textContent = input.textContent.slice(0, index);
        } else {
            input.textContent = input.textContent.slice(index, input.textContent.length - 1);
        }
    }

    var processCommand = function() {
        var command = input.textContent.toLowerCase();
        input.textContent = new String();

        if (command.startsWith("help")) {
            out = "";
            commands.forEach(function(cmd_obj, i) {
                out += cmd_obj.command;
                out += i < commands.length - 1 ? ", " : "";
            });

            out += "\n\nType ´man <command>´ for more information about that command.";
            printLn(out, msg.NORMAL);
        } else if (command.startsWith("man")) {
            var man_command = command.substring("man".length).trim();

            var valid = false;
            commands.forEach(function(cmd_obj, i) {
                if (cmd_obj.command.toLowerCase() === man_command) {
                    printLn(cmd_obj.help, msg.INFO);
                    valid = true;
                }
            });

            if (!valid) {
                printLn(`No man entry found for "${man_command}", type ´help´ for help.`, msg.ERROR);
            }
        } else {
            var valid = false;
            commands.forEach(function(cmd_obj, i) {
                if (cmd_obj.command.toLowerCase() === command) {
                    cmd_obj.exec.call(this);
                    valid = true;
                }
            });

            if (!valid) {
                printLn("Invalid command, type ´help´ for help.", msg.ERROR);
            }
        }
    };

    var launchPrompt = function() {
        fixPrompt();

        // backspace seems to be a special case since it's the browsers-default location.back
        window.addEventListener('keydown', function(event) {
            var keyCode = event.charCode ? event.charCode : event.keyCode;
            switch (keyCode) {
                case 8:
                case 46:
                    event.stopPropagation();
                    event.preventDefault();
                case 8:
                    removeChrAtIndexFromQueue(-1);
                    break;
                case 46:
                    removeChrAtIndexFromQueue(1);
                    break;
            }
        });

        window.addEventListener('keypress', function(e) {
            // handle press
            var keyCode = e.charCode ? e.charCode : e.keyCode;
            switch (keyCode) {
                case 13: // enter
                    processCommand(input.textContent);
                    break;
                default:
                    var str = String.fromCharCode(keyCode);
                    if (str) {
                        addChrToCommandQueue(str);
                    }
            }

            // move input to bottom
            fixPrompt();
        });
    };

    var printIntroMatrix = function(lin, chr) {
        if (lin < intro.length) {
            if (chr < intro[lin].length) {
                setTimeout(function() {
                    printChr(intro[lin][chr]);
                    chr++;
                    printIntroMatrix(lin, chr);
                }, chr_time);
            } else {
                lin++;
                setTimeout(function() {
                    printChr("\n");
                    printIntroMatrix(lin, 0);
                }, lin_time);
            }
        } else {
            launchPrompt();
            return false;
        }
    }

    resetLine();
    printIntroMatrix(0, 0);
}