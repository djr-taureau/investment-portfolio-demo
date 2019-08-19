export function roundedRect(x, y, w, h, r, [tl, tr, bl, br]: boolean[]) {
    let retval = "";

    w = Math.floor(w);
    h = Math.floor(h);

    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;

    retval = `M${[x + r, y]}`;
    retval += `h${w - 2 * r}`;

    if (tr) {
        retval += `a${[r, r]} 0 0 1 ${[r, r]}`;
    } else {
        retval += `h${r}v${r}`;
    }

    retval += `v${h - 2 * r}`;

    if (br) {
        retval += `a${[r, r]} 0 0 1 ${[-r, r]}`;
    } else {
        retval += `v${r}h${-r}`;
    }

    retval += `h${2 * r - w}`;

    if (bl) {
        retval += `a${[r, r]} 0 0 1 ${[-r, -r]}`;
    } else {
        retval += `h${-r}v${-r}`;
    }

    retval += `v${2 * r - h}`;

    if (tl) {
        retval += `a${[r, r]} 0 0 1 ${[r, -r]}`;
    } else {
        retval += `v${-r}h${r}`;
    }

    retval += `z`;

    return retval;
}

export function verticalRoundedRect(x, y, width, height, radius) {
    return (
        "M" +
        x +
        "," +
        y +
        "h" +
        (width - radius) +
        "a" +
        radius +
        "," +
        radius +
        " 1 0 " +
        radius +
        "," +
        radius +
        "v" +
        (height - 2 * radius) +
        "a" +
        radius +
        "," +
        radius +
        " 1 0 " +
        -radius +
        "," +
        radius +
        "h" +
        (radius - width) +
        "z"
    );
}
