use std::fmt;

pub trait Entity {

    fn get_id(&self) -> &EntityId;

}

// NOT THREAD SAFE
static mut ENTITY_COUNT: u64 = 0;

#[derive(Clone, Eq, PartialEq)]
pub struct EntityId {
    value: u64,
}

impl EntityId {

    pub fn new() -> EntityId {
        unsafe {
            ENTITY_COUNT += 1;

            EntityId {
                value: ENTITY_COUNT,
            }
        }
    }

    pub fn get_value(&self) -> u64 {
        self.value
    }

}

impl fmt::Display for EntityId {

    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.value)
    }

}

impl Default for EntityId {

    fn default() -> Self {
        EntityId::new()
    }

}

pub struct RectEntity {
    id: EntityId,
}

impl Entity for RectEntity {

    fn get_id(&self) -> &EntityId {
        &self.id
    }

}