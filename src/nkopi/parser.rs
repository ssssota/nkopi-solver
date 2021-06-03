use super::{chars::Block, node::Node};

pub fn parse(input: &str) -> Result<Node, &str> {
    let block_lines: Vec<Vec<Block>> = input
        .split('\n')
        .filter(|line| !line.is_empty())
        .map(|line| {
            line.chars()
                .map(|c| Block::from(c))
                .collect()
        })
        .collect();

    let height = block_lines.len();
    let width = block_lines[0].len();
    for block_line in block_lines {
        let cur_width = block_line.len();
        if cur_width != width {
            return Err("Invalid size");
        }
    }

    let mut node_lines: Vec<Vec<&'static mut Node>> = Vec::new();

    for y in 0..height {
        let mut line = Vec::new();
        node_lines.push(line);
        for x in 0..width {
            line.push(&mut Node {
                parents: (None, None),
                children: (None, None),
                block: block_lines[y][x],
            });
        }
    }

    for y in 0..height {
        for x in 0..width {
            let current: &'static mut Node = node_lines[y][x];

            if x > 0 {
                let left: &'static mut Node = node_lines[y][x - 1];
                current.parents.0 = Some(left);
                left.children.1 = Some(current);
            }
            if y > 0 {
                let upper: &'static mut Node = node_lines[y - 1][x];
                current.parents.1 = Some(upper);
                upper.children.0 = Some(current);
            }
            if x < (width - 1) {
                let right: &'static mut Node = node_lines[y][x + 1];
                current.children.1 = Some(right);
                right.parents.0 = Some(current);
            }
            if y < (height - 1) {
                let bottom: &'static mut Node = node_lines[y + 1][x];
                current.children.0 = Some(bottom);
                bottom.parents.1 = Some(current);
            }
        }
    }

    Ok(*node_lines[0][0])
}

#[test]
fn test_parse() {
    let n = parse(
        "　　お\n\
        　こま\n\
        　んこ\n\
        ちちう\n\
        こお　\n\
        んんん\n\
        ま　　\n\
        ち　　",
    );

    assert_eq!(*input, n);
}
