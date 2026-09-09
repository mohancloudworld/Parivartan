#!/bin/sh
# Prints the path of a JDK that can build this project, or exits non-zero.
#
# Gradle refuses a JRE-only JAVA_HOME, and Fedora's default `java` here is a
# JRE. Capacitor 8 also compiles at source level 21, so an older JDK fails with
# "error: invalid source release: 21" and a newer one can fail earlier still
# with "Unsupported class file major version". The JDK is usually in ~/.jdks
# rather than /usr/lib/jvm on this machine.
#
# Mirrors scripts/build-all.sh in the KidPage project, deliberately: same
# machine, same trap, and one behaviour to remember instead of two.
#
# Usage:  export JAVA_HOME="$(android/tools/find-jdk.sh)"
set -e
REQUIRED_JDK=21

# Ask javac what it is rather than reading it off the directory name, and do
# not take a preset JAVA_HOME on trust - CI runners commonly preset it to 17.
javac_major() {
    v=$("$1/bin/javac" -version 2>&1) || return 1
    v=${v#javac }
    v=${v%%.*}
    case "$v" in ''|*[!0-9]*) return 1 ;; esac
    echo "$v"
}

best=""
best_major=0
for d in ${JAVA_HOME:+"$JAVA_HOME"} "$HOME"/.jdks/* /usr/lib/jvm/*; do
    [ -x "$d/bin/javac" ] || continue
    major=$(javac_major "$d") || continue
    # Exactly 21 wins outright: it is what AGP and Capacitor 8 are tested
    # against. Anything newer is a fallback, not a preference.
    if [ "$major" -eq "$REQUIRED_JDK" ]; then echo "$d"; exit 0; fi
    if [ "$major" -gt "$REQUIRED_JDK" ] && [ "$major" -gt "$best_major" ]; then
        best=$d
        best_major=$major
    fi
done

if [ -z "$best" ]; then
    echo "No JDK $REQUIRED_JDK or newer found (checked \$JAVA_HOME, ~/.jdks, /usr/lib/jvm)." >&2
    exit 1
fi
echo "Warning: using JDK $best_major; AGP is tested against $REQUIRED_JDK." >&2
echo "$best"
