function levenshteinDistance (s, t) {
    if (s.length === 0) return t.length;
    if (t.length === 0) return s.length;

    return Math.min(
            levenshteinDistance(s.substr(1), t) + 1,
            levenshteinDistance(t.substr(1), s) + 1,
            levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
    );
}

function calculateLev(s,t)
{
    var val = levenshteinDistance(s,t)
    return val
}

module.exports = {calculateLev}