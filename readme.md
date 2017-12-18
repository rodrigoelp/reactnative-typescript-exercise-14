# Persisting state across multiple executions

More than likely that you have noticed by now, the application is losing any work we have done on it when we close it/dismiss it/swipe it off our screens.

We could (for instance), have a sqlite database that is listening to every operation we do and save it to the database. This interceptor of sorts should be able to read the application data store and preserve it as is (or some shape of it) so we can repopulate the state when launched again.

As you are noticing, I was talking about the applications store (as opposed to state) because it would make sense for us to consolidate meaningful data together and use it via `redux`.

_Enters `redux-persist`_

Redux Persist provides exactly what we where talking about, a _transparent_ way of saving our data store and rehydrate when we need it (when the application is launching again).

## Why Redux Persist?

Well... is easy to use, is quick and it works with `redux`!

But there are more reasons why I chose `redux-persist` and not `redux-storage` or `redux-save-state`:

1. **Maturity:** The library as a whole seems to be pretty mature and stable.
1. **Ease of use:** From the get go, all you need to understand are a few functions to hook it up in your code (more on this later).
1. **Community:** just looking at the issues and pull requests done to `redux-persist` vs `redux-storage` gives you an idea of the community engagement. These are always pretty good signs of a healthy community working in your libraries. The more peers reviewing the code, the more likely common issues have been resolved or there are workarounds for it.

## So... what exercise are we working on?

Side note... I have been gaining some weight recently and I want to track a bit more the energy I am consuming a day and I have listed a number of nutricious foods I get access to every now and then.

But!

(There is always a but, ain't?) My phone does not have the memory, capacity or age it used to... I launch a game and any other application gets immediately deallocated... all the information I have stored and now long gone and I continue chucking more food down the pipe (no self control), so once more I am going to rely on trustie old technology to the rescue and I want to do it with little effort, this is where `redux-persist` is going to be so useful.

## What did I have before?

My data store looked like this:

```typescript
// Basic information in my store
interface IAppStore {
    availableFood: IProduct[], // defined in the models file
    consumed: IDietItem[] // defined in the models file
}
```

If you have been following the series of exercises, then you know the top level of our application has a redux `Provider` component, wrapping the application and updating the store as follow:

```typescript
const AppShell = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

AppRegistry.registerComponent("App/Component Name", () => AppShell);
```

The store was generated calling the `createStore` function with the the `combineReducer` and the list of reducers for my store.

What `redux-persist` tells us we need to do to start the integration is to wrap that provider with another component (called `PersistGate`) which takes a `persistor`. But the store can not be the same old store we used to have... It needs to change as illustrated below:

```typescript
// We don't need this reducers any more
// const reducers = combineReducer({ someProp: someReducer });

// Instead we will define
const reducers = persistCombineReducers(
    // first the configuration. Using React Native Async Storage
    { key: "some key", storage: AsyncStorage },
    // same combine reducers config as before
    { someProp: someReducer }
);

const store = createStore(reducers, middleware);
const persistor = persistStore(store);
```

The configuration is pretty small in comparison to what we needed before. Now we need to change our `AppShell` to wrap the `Provider` with the `PersistGate` as follows:

```typescript
const AppShell = () => (
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </PersistGate>
);
```

That is all! Now the application is going to be saving the state as it changes. If I had an application already working and all I needed to do was to preserve the most meaningful information of my execution, I now can with very little code!

## What did I find challenging?

Writing the type definitions for `redux-persist`... It was the very first time writing something I had no control over and I was not certain I was doing it correctly until the exercise was working.

The good news is, the pull request has made it into master and any new version should maintain some of these definitions.
