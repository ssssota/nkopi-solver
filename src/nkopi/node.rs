use super::chars::Block;

#[derive(Debug, PartialEq)]
pub struct Node {
    pub parents: (Option<&'static Node>, Option<&'static Node>),
    pub children: (Option<&'static Node>, Option<&'static Node>),
    pub block: Block,
}
